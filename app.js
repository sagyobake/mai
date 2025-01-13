Deno.serve({
    port: 443,
    handler: async (request) => {
        console.log(request.url);

        let file = '';
        if (request.url === '/') {
            file = await Deno.open('./index.html', { read: true });
        } else {
            file = await Deno.open(`${request.url}`, { read: true });
        }

        return new Response(file.readable);

    },
});
