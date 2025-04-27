<script setup>

</script>

<template>
    <div class="schedule-form">
        <h3 class="h3">Overordnet egenkontrol af ABA-anlæg</h3>
        <form class="schedule-form__formular">
            <p class="p1">Alle systemdele er tilkoblet og fuldt funktionsdygtige og kun aftalte enheder er frakoblet</p>
            <label class="p1">
                <input class="checkbox-input" type="checkbox" name="yes" value="yes">
                Ja
            </label>
            <label class="p1">
                <input class="checkbox-input" type="checkbox" name="no" value="no">
                Nej
            </label>
            <label class="p1" for="comment">Kommentar</label>
            <textarea name="comment" rows="3"></textarea>

            <p class="p1">Evt. fejlmeldinger er udbedret eller under udbedring?</p>
            <label class="p1">
                <input class="checkbox-input" type="checkbox" name="yes" value="yes">
                Ja
            </label>
            <label class="p1">
                <input class="checkbox-input" type="checkbox" name="no" value="no">
                Nej
            </label>
            <label class="p1" for="comment">Kommentar</label>
            <textarea name="comment" rows="3"></textarea>
            <div class="schedule-form__button">
                <button class="p1 p-white schedule-form__button__save" type="button">Gem og luk</button>
                <button class="p1 p-blue schedule-form__button__save-temporary" type="button">Gem midlertidig</button>
            </div>
        </form>
    </div>

</template>

<style scoped lang="scss">


.schedule-form {
    background-color: #FFFFFF;
    border-radius: 1.5em;
    padding: 2em; //ikke rigtig

    &__formular {
        display: flex;
        flex-direction: column;
        gap: 1.5em; //ikke rigtig
    }

    &__button {
        display: flex;
        gap: 1em; //ikke rigtig

        &__save {
            background-color: #2B7393;
            border-radius: 0.5em;
            border-style: none;
            padding: 0.5em;
        }

        &__save-temporary {
            background-color: #FFFFFF;
            border-color: #2B7393;
            border-radius: 0.5em;
            border-style: solid;
            padding: 0.5em;
        }
    }

}

.p-blue {
    color: #2B7393;
}

.p-white {
    color: #FFFFFF;
}

label {
    border-radius: 50%;
}

.checkbox-input {
        appearance: none;
        background-color: #fff;
        border: 2px solid #ccc;
        border-radius: 50%;
        height: 1.5em;       
        width: 1.5em;
    }

textarea {
    border-color: #2B7393;
    border-radius: 0.5em;
    border-style: solid;
}
</style>