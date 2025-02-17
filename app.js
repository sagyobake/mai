Deno.serve(async (req) => {

    const html = await Deno.readFile("./index.html");

    if (req.headers.get("upgrade") != "websocket") {
        return new Response(html);
    }
    const { socket, response } = Deno.upgradeWebSocket(req);


    socket.addEventListener("open", () => {

        function getRandomInt(min, max) {
            const minCeiled = Math.ceil(min);
            const maxFloored = Math.floor(max);
            return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // 上限は除き、下限は含む
        }

        //関数計算機
        const heartGenerator = () => {
            for (let i = -1; i <= 1.6; i += 0.002) { //0.015
                for (let j = -1; j <= 1.6; j += 0.002) { //0.015
                    const a = i ** 2 + (j - Math.cbrt(i ** 2)) ** 2;
                    if (a > 0.995 && a < 1.005) {
                        socket.send(JSON.stringify({ i, j}));
                    }
                }
            }
        }
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

