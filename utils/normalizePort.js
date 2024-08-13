export default function normalizePort(port) {
  const portNumber = Number(port)
  if (portNumber >= 0) {
    return portNumber
  }
  return false
}
