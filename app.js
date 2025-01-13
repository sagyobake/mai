Deno.serve({
    port: 443,
    handler: async (request) => {
        const path = request.url.split('/');
        const file_name = path[path.length - 1];
        console.log(file_name);

        let file = '';
        if (file_name === '') {
            file = await Deno.open('./index.html', { read: true });
        } else {
            file = await Deno.open(`./${file_name}`, { read: true });
        }

        return new Response(file.readable);

    },
});
