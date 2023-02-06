import * as user from '../user';

/*describe('user handler', () => {
  it('should do something when something happens', () => {
    expect(1).toBe(1);
  });
});*/

describe('user handler', () => {
  it('should create a new uer', async() => {
    const req = { body: {username: 'miguel', password: 'hi'}};
    const res = { json({ token }) {
      console.log(token);
      expect(token).toBeTruthy();
    }}

    const newUser = await user.createNewUser(req, res, () => {});
  });
});