<template>
    <div class = "text-xl">
        <h1 class="text-xl">{{name}}'s hand</h1>
        <div v-if = "hand" class="flex">
            <Card v-if = "player.hand" v-for = "card in hand" :card = "card" />
        </div>
        <div v-if="player.score !== undefined">
            <h1>{{name}}'s score:</h1>
            <h2>{{score}}</h2>
        </div>
    </div>
</template>
<script setup lang="ts">
import Card from './Card.vue'
import {Player} from '../types/player-types'
import {ref} from 'vue'

const {player} = defineProps<{
    player: Player;
    position?: "top" | "bottom";
}>();

const hand = ref(player.hand);
const name = ref(player.name);
const score = ref(player.score);
</script>