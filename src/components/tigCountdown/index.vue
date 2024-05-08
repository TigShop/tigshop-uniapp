<template>
    <view class="tig-countdown">
        <uni-countdown
            :color="color"
            :background-color="backgroundColor"
            :font-size="fontSize"
            :splitorColor="splitorColor"
            :show-day="days > 0"
            :day="days"
            :hour="hours"
            :minute="minutes"
            :second="seconds"
        />
    </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps({
    color: {
        type: String,
        default: "#fff"
    },
    backgroundColor: {
        type: String,
        default: ""
    },
    splitorColor: {
        type: String,
        default: "#fff"
    },
    startTime: {
        type: String,
        default: ""
    },
    endTime: {
        type: String,
        default: ""
    },
    fontSize: {
        type: Number,
        default: 12
    }
});

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

onMounted(() => {
    const endTimestamp = dateStringToTimestamp(props.endTime);
    const nowTimestamp = new Date().getTime();
    // 计算差值（毫秒）
    let diffMilliseconds = endTimestamp - nowTimestamp;
    if (diffMilliseconds > 0) {
        getCountdownTime(diffMilliseconds);
    }
});

/*转时间搓 */
const dateStringToTimestamp = (dateString: any) => {
    const dateParts = dateString.split(" ");
    const [year, month, day] = dateParts[0].split("-");
    const [hour, minute, second] = dateParts[1].split(":");
    const date = new Date(year, month - 1, day, hour, minute, second);
    return date.getTime();
};

/*计算时间 */
const getCountdownTime = (diffMilliseconds: number) => {
    // 转换为天、时、分、秒
    days.value = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
    diffMilliseconds -= days.value * (1000 * 60 * 60 * 24);
    hours.value = Math.floor(diffMilliseconds / (1000 * 60 * 60));
    diffMilliseconds -= hours.value * (1000 * 60 * 60);
    minutes.value = Math.floor(diffMilliseconds / (1000 * 60));
    diffMilliseconds -= minutes.value * (1000 * 60);
    seconds.value = Math.floor(diffMilliseconds / 1000);
    console.log(`剩余：${days.value} 天 ${hours.value} 小时 ${minutes.value} 分 ${seconds.value} 秒`);
};
</script>

<style lang="scss" scoped></style>
