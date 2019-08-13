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
</script>