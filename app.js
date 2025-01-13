Deno.serve({
    port: 443,
    handler: async (request) => {
        console.log(request.url);
        const file = await Deno.open('./index.html', { read: true });
        return new Response(file.readable);

    },
});
