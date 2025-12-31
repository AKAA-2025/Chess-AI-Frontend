export interface ApiResignRequest {
  reason: "resign" | "timeout" | "disconnect",
}