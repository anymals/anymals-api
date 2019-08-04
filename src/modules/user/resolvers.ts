import {GQL} from "../../types/schema";
import * as bcrypt from "bcryptjs";
import {User} from "../../entity/User";
import {ResolverMap} from "../../types/graphql-utils";
import * as yup from "yup";
import {formatYupError} from "../../utils/formatYupError";

const schema = yup.object().shape({
    email: yup.string().min(3,"Email too short!").max(255).email(),
    password: yup.string().min(8).max(255)
});


export const resolvers: ResolverMap = {
    Query: {
        hi: () => "hello"
    },
    Mutation: {
        register: async (
            _,
           args: GQL.IRegisterOnMutationArguments
        ) => {
            try {
                await schema.validate(args,{abortEarly: false})
            }catch (err) {
                return formatYupError(err);
            }
            const { email, password } = args;
            const userAlreadyExists = await User.findOne({
                where: {email},
                select: ["id"]
            });

            if (userAlreadyExists) {
                return [
                    {
                        path: "email",
                        message: "already taken"
                    }
                ];
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = User.create({
                email,
                password: hashedPassword
            });

            await user.save();
            return null;
        }
    }
};