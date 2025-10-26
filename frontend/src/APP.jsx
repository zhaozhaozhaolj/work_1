import { useState } from "react";
import axios from "axios";

export default function App() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3001/api/connections", {
      params: { start, end },
    });
    setData(res.data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">TCP连接监控表</h1>
      <div className="flex gap-2 mb-4">
        <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} className="border p-2 rounded w-1/2" />
        <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} className="border p-2 rounded w-1/2" />
        <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2 rounded">查询</button>
      </div>

      <table className="w-full border-collapse border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">本地地址</th>
            <th className="border px-2 py-1">连接时长(秒)</th>
            <th className="border px-2 py-1">创建时间</th>
            <th className="border px-2 py-1">最后活跃时间</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan="4" className="text-center p-4 text-gray-500">暂无数据</td></tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1">{row.local_address}</td>
                <td className="border px-2 py-1 text-right">{row.duration_seconds}</td>
                <td className="border px-2 py-1">{new Date(row.created_at).toLocaleString()}</td>
                <td className="border px-2 py-1">{new Date(row.last_active_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
