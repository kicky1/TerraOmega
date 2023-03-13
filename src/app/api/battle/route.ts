import api from "@/app/utils/api";
import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import cron from 'node-cron';

let intervalId: any;

export async function POST(req: Request, res: Response) {
    const isRunning = req.body;
    
    console.log(req);


    if (isRunning) {
    //   intervalId = cron.schedule('*/1 * * * *', async () => {
    //      data = await getUsersData();
    //   });

      await supabase.from('bot_data').update({ is_running: true }).eq('id', 1);
    } else {
    //   intervalId.destroy();

      await supabase.from('bot_data').update({ is_running: false }).eq('id', 1);
    }

    return NextResponse.json({success: true})
}

export async function getUsersData(): Promise<Array<any>> { // add a type here
    const { data } = await api.get('battle',{})

    let players = data.players

    players = players.filter((obj: any) => obj.hasOwnProperty('username'));

    
    return players
}
