Deno.serve({
    port: 443,
    handler: async (request) => {

        const file = await Deno.open("./index.html", { read: true });
        return new Response(file.readable);

    },
});
