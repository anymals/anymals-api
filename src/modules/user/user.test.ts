import {request} from "graphql-request";
import {User} from "../../entity/User";
import {createTypeOrmConn} from "../../utils/createTypeOrmConn";
import {test_host} from "./constants";


beforeAll(async () => {
    await createTypeOrmConn();
});

const email = "tom@bob.com";
const password = "12345678";

const mutation = `
mutation {
  register(email: "${email}", password: "${password}") {
    path
    message
  }
}
`;

test("Register user", async () => {
    const response = await request(test_host, mutation);
    expect(response).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
    const response2: any = await request(test_host, mutation);
    expect(response2.register).toHaveLength(1);
    expect(response2.register[0].path).toEqual("email");
});