<template>
    <div>
        <Board>
            <template v-slot:dealer>
                <Player :player="dealer"/>
            </template>
            <template v-slot:player>
                <Player :player="player1"/>
            </template>
            <template v-slot:deck></template>
        </Board>
    </div>
</template>
<script setup lang="ts">
import {player1, dealer} from '../data/player-data';
import Player from '../components/Player.vue';
import Board from "../components/Board.vue";
</script>