Deno.serve({ port: 4321 }, async (req) => {

    const html = await Deno.readFile("./index.html");

    if (req.headers.get("upgrade") != "websocket") {
        return new Response(html);
    }
    const { socket, response } = Deno.upgradeWebSocket(req);


    socket.addEventListener("open", () => {


        //関数計算機
        const heartGenerator = () => {
            for (let i = -1; i <= 1.6; i += 0.015) { //0.015
                for (let j = -1; j <= 1.6; j += 0.015) { //0.015
                    const a = i ** 2 + (j - Math.cbrt(i ** 2)) ** 2;
                    if (a < 0.99 && a < 1.01) {
                        socket.send(JSON.stringify({ i, j }));
                    }
                }
            }
        }
        heartGenerator();
        heartGenerator();
        //---------------------

    });

    socket.addEventListener("message", (event) => {
        if (event.data === "ping") {
            socket.send("pong");
        }
    });

    return response;
});

