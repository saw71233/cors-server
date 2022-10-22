/**
 *
 * @param {Request} request
 * @param {*} context
 */
export default async function (request) {
  try {
    const reqBody = request.body;
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "post",
      body: reqBody,
    });
    const params = new URLSearchParams(await res.text());
    return new Response(
      JSON.stringify(
        Array.from(params.entries()).reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {})
      )
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
}