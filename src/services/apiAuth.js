import supabase, { supabaseUrl } from "./supabase";


export async function signup({email, password , fullName}){

    const{data , error} = await supabase.auth.signUp({email, password,options:{
        data:{
            fullName,
            avatar:'',
        }
    }
})
if(error)
    throw new Error(error.message);
    console.log("Ur Data is not in our Database please... signIN ")
       
   console.log(data)
    return data;
}

export async function login({email, password}){

    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

   if(error)
    throw new Error(error.message);
    console.log("Ur Data is not in our Database please... signIN ")
       
   console.log(data)
    return data;
}

export async function getCurrentUser(){
    const{data:session} = await supabase.auth.getSession();
    if(!session.session) return null;
    const{data , error} = await supabase.auth.getUser();
     //console.log(data)
    if(error)
    {
    throw new Error(error.message);
    }
       return data?.user
}

export async function logout(){
   const{error} =  await supabase.auth.signOut();
   if(error) throw new Error(error.message);
}

export async function updateCurrentUser({fullName , password , avatar}){

    //update password or fullName
    let updateData;
    if(password) updateData = {password};
    if(fullName) updateData = { data : {fullName}};

    const {data , error} = await supabase.auth.updateUser(updateData);

    if(error) throw new Error(error.message);
    if(!avatar) return data;

    //upload the avatar image
    const fileName = `avatar-${data.user.id}-${Math.random()}`
    const{error:StorageError} = await supabase.storage.from('avatars').upload(fileName , avatar);
    if(StorageError) throw new Error(StorageError.message)


    //Update avatar in the user table
     const{data:updatedUser , error:error2} = await supabase.auth.updateUser({
        data:{
            avatar:`${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
        }
     });
     if(error2) throw new Error(error2.message);
     return updatedUser
}