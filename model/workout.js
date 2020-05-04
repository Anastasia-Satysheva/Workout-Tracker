const mongoose = require("mongoose")

// const CardioSchema = require("./cardio")
// const ResistanceSchema = require("./resistance")

const ExerciseSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    weights: {
        type: Number,
        default: 0
    },
    sets: {
        type: Number,
        default: 0
    },
    reps: {
        type: Number,
        default: 0
    },
    distance: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = ExerciseSchema;

const WorkoutSchema = new mongoose.Schema({
    totalDuration: {
        type: Number,
        default: 0
    },
    exercises: [ExerciseSchema],
    day: {
        type: Date,
        default: Date.now
    }
})

const Exercise = mongoose.model("Exercise", ExerciseSchema);
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = { Exercise, Workout }