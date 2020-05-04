const express = require("express")
const mongoose = require("mongoose")

const { Exercise, Workout } = require("../model/workout")

const router = express.Router();



router.get("/workouts", (req, res) => {
    Workout.findOne().sort({ day: -1 })
        .then(lastWorkout =>  res.send(lastWorkout))
        .catch(err => console.log(err))
})


router.post("/workouts", (req, res) => {
    
    const newWorkout = new Workout;

    if (req.body.type === "resistance" || req.body.type === "cardio") {
        
        newWorkout.totalDuration += duration;
        newWorkout.exercises.push( req.body );

    }
    newWorkout.save()
        .then(data => {
            lastWorkout = data._id;
            console.log("Resistance Workout has been added");
            res.send(data);
        })
        .catch(err => console.log(err))
})


router.get("/workouts/range", (req, res) => {
    Workout.find()
        .then(workout => res.send(workout))
        .catch(err => console.log(err))
})


router.put("/workouts/:id", (req, res) => {
    console.log(req.params.id);
    const { type, name, weights, sets, reps, distance, duration } = req.body;
    Workout.findById(req.params.id)
        .then(lastWorkout => {
            console.log(lastWorkout);
            if (lastWorkout) {
                lastWorkout.totalDuration += duration;

                if (type === "cardio" || type === "resistance") 
                    lastWorkout.exercises.push( req.body );
                
                return lastWorkout.save()
            }
        })
        .then(data => res.send(data))
        .catch(err => console.log(err))

})

module.exports = router