<template>
    <div class="monallog-home">
        <div class="home-content">
            <div class="main-logo">
                <img src="@/assets/main-logo.png"
                srcset="@/assets/main-logo@2x.png 2x,
                        @/assets/main-logo@3x.png 3x"
                class="main-logo-img">
            </div>
            <div class="search">
                <span class="text-bar">
                    <input type="text" class="input-text" placeholder="FIND YOUR CHANNEL">
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MonallogHome'
}
</script><style scoped>
</script>

<style scoped>
.home-content {
    opacity: 0.75;
}

.text-bar {
    border: 4px solid var(--white);
    border-radius: 42px;

    opacity: 0.75;
}

.text-bar .input-text {
    outline: 0;
    border: 0;
    background-color: transparent;

    font-family: NanumBarunGothic;
    font-size: 24px;
    color: var(--white);
}

input.input-text::placeholder {
    opacity: 0.75;
    font-family: Relancer;
}
</style>