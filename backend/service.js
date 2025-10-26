import { pool } from "./db.js";

// 业务逻辑层：获取 TCP 连接统计
export async function getConnections(start, end) {
  const query = `
    SELECT
      CONCAT(local_ip, ':', local_port) AS local_address,
      EXTRACT(EPOCH FROM (last_active_at - created_at)) AS duration_seconds,
      created_at,
      last_active_at
    FROM tcp_connections
    WHERE (last_active_at - created_at) >= INTERVAL '5 seconds'
      AND created_at BETWEEN $1 AND $2
    ORDER BY duration_seconds DESC;
  `;
  const result = await pool.query(query, [start, end]);
  return result.rows.map(r => ({
    local_address: r.local_address,
    duration_seconds: Number(r.duration_seconds),
    created_at: r.created_at,
    last_active_at: r.last_active_at,
  }));
}
