import axios from "axios";

export const validateUser = async (user) => {
  let val = '';
  try {
    const url = 'https://reqres.in/api/register';
    const params = {
      "email": user.email,
      "password": user.password
    }

    await axios.post(url, params)
    .then((res) => {
      const { data } = res;

      console.log('res ', res);

      val = data.token;
    })
    return await val;
  }catch (err){
    console.log(err);
    return err;
  };  
}