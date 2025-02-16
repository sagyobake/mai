Deno.serve(async (req) => {
    
    const html = await Deno.readFile("./index.html");

    if (req.headers.get("upgrade") != "websocket") {
        return new Response(html, { status: 200 });
    }
    const { socket, response } = Deno.upgradeWebSocket(req);
    socket.addEventListener("open", () => {
        console.log("a client connected!");
    });
    socket.addEventListener("message", (event) => {
        if (event.data === "ping") {
            socket.send("pong");
        }
    });
    return response;
});