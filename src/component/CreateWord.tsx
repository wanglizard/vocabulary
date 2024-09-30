import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {IDay} from "./DayList";

export default function CreateWord() {
    const days: IDay[] = useFetch("http://localhost:3001/days");
    const navigate = useNavigate(); // useNavigate로 history 대신에 navigate 사용
    const [isLoading, setIsLoading] = useState(false);

    // const jpRef = useRef<HTMLElement>(null);
    // const yomiganaRef = useRef<HTMLElement>(null);
    // const korRef = useRef<HTMLElement>(null);
    // const dayRef = useRef<HTMLSelectElement>(null);

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!isLoading && dayRef.current && jpRef.current && yomiganaRef.current && korRef.current) {
            setIsLoading(true);

            const day = dayRef.current.value;
            const jp = jpRef.current.value;
            const yomigana = yomiganaRef.current.value;
            const kor = korRef.current.value;

            fetch(`http://localhost:3001/words/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    day,
                    jp,
                    yomigana,
                    kor,
                    isDone: false,
                }),
            }).then(res => {
                if (res.ok) {
                    alert("生成が完了しました");
                    navigate(`/day/${day}`);
                    setIsLoading(false);
                }
            });
        }
    }

    const jpRef = useRef<HTMLInputElement>(null);
    const yomiganaRef = useRef<HTMLInputElement>(null);
    const korRef = useRef<HTMLInputElement>(null);
    const dayRef = useRef<HTMLSelectElement>(null);

    return (
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <label>Jp</label>
                <input type="text" placeholder="退勤" ref={jpRef}/>
            </div>
            <div className="input_area">
                <label>Yomigana</label>
                <input type="text" placeholder="たいきん" ref={yomiganaRef}/>
            </div>
            <div className="input_area">
                <label>Kor</label>
                <input type="text" placeholder="퇴근" ref={korRef}/>
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref={dayRef}>
                    {days.map(day => (
                        <option key={day.id} value={day.day}>
                            {day.day}
                        </option>
                    ))}
                </select>
            </div>
            <button
                style={{
                    opacity: isLoading ? 0.3 : 1,
                }}
                disabled={isLoading} // 버튼 비활성화 추가
            >
                {isLoading ? "保存中..." : "保存"}
            </button>
        </form>
    );
}
