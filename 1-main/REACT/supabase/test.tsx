import supabase from "../../supabaseClient.js";


async function newFunc() {
    const { data, error } = await supabase
    .from('habit_histories')
    .select()

    console.log(data)
}

newFunc()
