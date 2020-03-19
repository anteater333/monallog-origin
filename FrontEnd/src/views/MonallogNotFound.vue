<template>
    <div class="monallog-not-found">
        <div class="background-cover background-black">
        </div>
        <div class="not-found-content">
            <div class="not-found-logo">
                <img src="@/assets/not-found-logo.png"
                class="not-found-logo-img">
            </div>
            <div class="not-found-text">
                이런, 말씀하신 페이지는 우리에게 없는 것 같아요.
            </div>
            <router-link class="monallog-button go-home-button" to="/">
              메인 페이지로
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MonallogNotFound',
}
</script>

<style scoped>
.background-black {
  /* Cover with empty black background */
  background-color: var(--black);
}

.not-found-content {
    position: absolute;
    top: 25vh;
    
    width: 100%;

    opacity: 0.75;
}

.not-found-text {
    margin-bottom: 5vh;

    font-size: 18px;
    font-family: NanumBarunGothic;
}

.go-home-button {

    padding: 0.5rem 1rem 0.5rem 1rem;

    font-size: 24px;
    font-family: NanumBarunGothic;

    background-color: var(--black);
    color: var(--white);

    transition: .5s;
}

.go-home-button:hover {
    background-color: var(--white);
    color: var(--black);
}
</style>
