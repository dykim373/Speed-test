'use client'

export default function Home({searchParams}: {searchParams: SearchParams}) {
    const result = searchParams.result;

    return (
        <div>
            <div
                className="h-[100px] my-[30px] text-black text-center text-8xl"
            >반응속도 테스트</div>
            <a href="/">
                <div
                    className="w-full h-[500px] bg-blue-600 text-white text-7xl
                    flex flex-col text-center justify-center"
                >
                    <p className="my-[25px] text-8xl font-semibold">{result} <span className="font-normal text-7xl">ms</span></p>
                    <p className="my-[25px]">Click to Go Home</p>
                </div>
            </a>
        </div>
    )
}

interface SearchParams {
    result: string;
}
