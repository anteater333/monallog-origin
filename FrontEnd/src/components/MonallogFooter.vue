<template>
    <footer>
        <span class="footer-text">monallog, 집단적 독백</span>
    </footer>
</template>

<script>
export default {
    name: 'MonallogFooter'
}
</script>

<style scoped>
footer {
    height: 48px;

    padding-top: 12px;

    background-color: var(--black);
}

.footer-text {
    font-size: 8px;
    opacity: 0.75;
    font-family: NanumBarunGothic;
}
</style>
