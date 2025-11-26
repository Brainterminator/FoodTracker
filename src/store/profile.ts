import { defineStore } from "pinia";

export interface Profile {
    name: string;
    age: number;
    gender: "male" | "female";
    height: number; // cm
    weight: number; // kg
    activity: "low" | "medium" | "high";
    goal: "maintain" | "lose" | "gain";
}

export const useProfileStore = defineStore("profile", {
    state: (): { profile: Profile } => ({
        profile: {
            name: "",
            age: 25,
            gender: "male",
            height: 180,
            weight: 75,
            activity: "medium",
            goal: "maintain",
        },
    }),
    getters: {
        calorieGoal: (state) => {
            const p = state.profile;
            const bmr =
                10 * p.weight + 6.25 * p.height - 5 * p.age + (p.gender === "male" ? 5 : -161);

            const activityFactor =
                p.activity === "low" ? 1.2 : p.activity === "medium" ? 1.55 : 1.725;
            const goalOffset =
                p.goal === "lose" ? -300 : p.goal === "gain" ? 300 : 0;

            return Math.round(bmr * activityFactor + goalOffset);
        },
    },
    persist: true,
});
