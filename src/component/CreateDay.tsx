import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {IDay} from "./DayList";

export default function CreateDay() {
    const days: IDay[] = useFetch("http://localhost:3001/days");
    const navigate = useNavigate();

    function addDay() {

        fetch(`http://localhost:3001/days/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                day: days.length + 1,
            }),
        }).then(res => {
            if (res.ok) {
                alert("生成が完了しました");
                navigate(`/`);
            }
        });
    }

    return (
        <div>
            <h3>現在日付数 : {days.length}日</h3>
            <button onClick={addDay}>日付追加</button>
        </div>
    );
}
