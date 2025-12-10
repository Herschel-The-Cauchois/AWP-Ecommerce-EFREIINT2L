<template>

    <footer>

        <hr/>

        <p>© The Ticket Buro Development Team, 2025. All Rights Reserved.</p>

        <div>
            <img class="logo" id="efrei" src="https://etudestech.com/wp-content/uploads/2022/01/logo_efrei_web_bleu.png" alt="EFREI Logo"></img>
            <img class="logo" src="https://www.pngkit.com/png/full/477-4778077_transprent-free-download-line-letter-x-fire-png.png"></img>
            <img class="logo" src="https://sylabusy.agh.edu.pl/build/main/static/og_logo.png" alt="AGH Logo"></img>
        </div>

    </footer>

</template>

<script>

</script>

<style scoped>

footer {
    margin-top: 2em;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    height: 15em;
}

hr {
    padding: 0.2em 0.5em;
    border-radius: 4px;
    background-color: white;
}

p {
    color: white;
}

div {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: space-between;
    width: 30%;
    height: 5em;
    background-color: white;
    border-radius: 4px;
    padding: 0.2em 1em;
    overflow: hidden;
}

.logo {
    max-height: 80%;
    max-width: 90%;
}

#efrei {
    padding-right: 2.5em;
}
    
</style>