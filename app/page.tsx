'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Home() {
    const [record, setRecord] = useState<number[]>([]);
    const [state, setState] = useState<State>(State.Main);
    const [startTime, setStartTime] = useState<number>(0);
    const router = useRouter();
    
    /* Set Screen by State */
    const [message, setMessage] = useState<string>("");
    const [color, setColor] = useState<string>("");
    useEffect(() => {
        if (state === State.Main) {
            setMessage("Click to Start");
            setColor("bg-black");
        } else if (state === State.Ready) {
            setMessage("Ready");
            setColor("bg-red-500");
            const random: number = 800 + (Math.random())*2200;
            setTimeout(()=>setState(State.Now), random);
        } else if (state === State.Now) {
            setMessage("Click Now!");
            setColor("bg-green-600");
            const date = new Date();
            setStartTime(date.getTime());
        } else {
            console.error("Error");
        }
    }, [state]);
    /* <END> Set Screen by State */

    
    /* When Click */
    const onClick = () => {
        if (state === State.Main) {
            setState(State.Ready);
        } else if (state === State.Ready) {
            location.reload();
        } else if (state === State.Now) {
            clickWhenNow();
        } else {
            console.error("Error");
        }
    }
    const clickWhenNow = () => {
        const date = new Date();
        const endTime: number = date.getTime();
        const reactionTime: number = endTime - startTime;
        const newRecord = [...record];
        newRecord.push(reactionTime);
        if(newRecord.length < 5) {
            setRecord(newRecord);
            setTimeout(() => setState(State.Ready), 100);
        } else {
            let sum: number = 0;
            newRecord.map(num => sum += num);
            const result = sum / newRecord.length;
            router.push(`/result?result=${result}`);
        }
    }
    /* <END> When Click */


    return (
        <div>
            <div
                className="h-[100px] my-[30px] text-black text-center text-8xl"
            >반응속도 테스트</div>
            <button
                onClick={onClick}
                className={`w-full h-[500px] ${color} text-white text-8xl font-semibold`}
            >
                <p>{message}</p>
            </button>
            {record.map((time, index) => 
                <div
                    key={index}
                    className="text-lg text-center font-bold text-slate-800 my-[6px]"
                >{time} ms</div>
            )}
        </div>
    )
}

enum State {
    Main,
    Ready,
    Now,
}
