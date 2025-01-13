Deno.serve({
    port: 443,
    handler: async (request) => {
        console.log(request.url);

        let file = '';
        if (request.url === '/') {
            file = await Deno.open('./index.html', { read: true });
        } else {
            
        }

        return new Response(file.readable);

    },
});
