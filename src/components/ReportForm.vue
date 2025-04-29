<script setup>
</script>

<template>
    <div class="report">
        <form class="report-form">
            <div class="report-form__filter">
                <p class="p1">Vis 50 af 0 (indsæt ikon)</p>
            </div>
            <div class="report-form__wrapper">
                <label>
                    <p class="p1">Fra dato</p>
                    <input type="date">
                </label>
                <label>
                    <p class="p1">Til dato</p>
                    <input type="date">
                </label>
                <label>
                    <p class="p1">Skema</p>
                    <select>
                        <option>

                        </option>
                    </select>
                </label>
                <label>
                    <p class="p1">Lokation</p>
                    <select>
                        <option>

                        </option>
                    </select>
                </label>
                <label>
                    <p class="p1">Bruger</p>
                    <select>
                        <option>

                        </option>
                    </select>
                </label>
                <label>
                    <p class="p1">Tag</p>
                    <input type="text">
                </label>
                <label>
                    <p class="p1">Id</p>
                    <input type="text">
                </label>
            </div>
            <div class="report-form__checkbox">
                <label class="p1">
                    <input class="checkbox-input" type="checkbox" name="afvigelse" value="afvigelse">
                    Afvigelse
                </label>
                <label class="p1">
                    <input class="checkbox-input" type="checkbox" name="midlertidige" value="midlertidige">
                    Midlertidige
                </label>
                <label class="p1">
                    <input class="checkbox-input" type="checkbox" name="kommentar" value="kommentar">
                    Kommentar
                </label>
                <label class="p1">
                    <input class="checkbox-input" type="checkbox" name="inkluderer arkiverede" value="inkludere arkiverede">
                    Inkluderer arkiverede
                </label>
            </div>
            <div class="report-form__button">
                <button class="p1 p-white report-form__button__search" type="button">Søg</button>
                <button class="p1 p-blue report-form__button__white" type="button">Download CSV</button>
                <button class="p1 p-blue report-form__button__white" type="button">Ryd filter</button>
            </div>
            <h2 class="report-form-h2">Alle vises</h2>
        </form>
    </div>

</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.report {

    &-form {
        background-color: v.$white;
        border-radius: 1.5em;
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 2em; 

        &__button {
            display: flex;
            gap: 1em; 

            &__search {
                background-color: v.$main-blue;
                border-radius: 0.5em;
                border-style: none;
                padding: 0.5em;
            }

            &__white {
                background-color: v.$white;
                border-color: v.$main-blue;
                border-radius: 0.5em;
                border-style: solid;
                padding: 0.5em;
            }
        }
        &__wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 1em;
        }

        &__checkbox {
            display: flex;
            flex-direction: column;
        }

        &__filter {
            display: flex;
            justify-content: flex-end;
        }
    }
}

input, select {
    border-radius: 3px;
    border: 1px solid v.$main-blue;
    height: 100%;
    width: 100%;
}

input[type="date"] {
    font-size: 1.5em;
}

label {
    box-sizing: border-box;
    margin-bottom: 3em;
    width: calc(33% - 1em);
}


.checkbox-input {
        appearance: none;
        border: 2px solid v.$main-blue;
        border-radius: 50%;
        height: 1.5em;
        width: 1.5em;
}

.report-form-h2 {
    text-align: center;
}
</style>