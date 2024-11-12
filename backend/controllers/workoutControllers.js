const Workout = require("../models/workoutModel");
const mongoose = require('mongoose')

// GET all the workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  const workouts = await Workout.find({user_id}).sort({ createdAt: -1 }); // sorting the workouts in descending order by their creation time
  res.status(200).json(workouts);
};

// Get a particular workout
const getWorkout = async (req, res) => {
  const { id } = req.params;         // same as req.params.id
//   console.log(req.params)
//   console.log(req.params.id)
//   console.log(id)
    
  // before searching for the workout by the id, we check if the id is of correct format or no
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.json({error: "No such workout"})
  }

  // this code is executed only when the above validation is successful
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  } else {
    res.status(200).json(workout);
  }
};

// GET workouts of a particular user
const getWorkoutsofanUser = async (req, res) => {
  const params = req.params
  const user_id = params.id
  console.log(user_id)
  const workouts = await Workout.find({user_id})
  res.status(200).json(workouts)
}

// ADD a workout
const addWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  // we will submit these 3 properties in the front end and then we make the post request, and the request is parsed with
  // the json values by the express.json() function. Here we are making a new object using the values we get from the
  // request body

  let emptyFields = [];

  if(!title){
    emptyFields.push('title');
  }
  if(!load){
    emptyFields.push('load');
  }
  if(!reps){
    emptyFields.push('reps');
  }
  if(emptyFields.length > 0){
    return res.status(400).json({error : "Please fill all the fields !", emptyFields})
  }

  // The above array emptyFields is an array of all the empty fields, we get that when we check that in the req.body object if any
  // property is empty or no. Those which are empty get pushed into the array and the final array is sent to the frontend as a
  // response along with an error message.
  // One could think of handling this in the frontend, before even making the POST request to the backend
  // we could do that by checking in the handleSubmit function in the form component that whether all the fields are filled before
  // making the POST request but in that case there would be internal issues (basically I tried this but failed to do the same so I
  // did what net ninja did i.e., handling it in this backend file)

  try {
    const user_id = req.user.id
    // const workout = await Workout.create(req.body);
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a workout
const delWorkout = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid ID"})
    }

    const workout = await Workout.findOneAndDelete({_id : id})

    if(!workout){
        return res.status(400).json({error: "No such workout found"})
    }

    return res.status(200).json(workout)
}

// UPDATE a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid ID"})
    } 

    const workout = await Workout.findOneAndUpdate({_id : id}, {
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error: "No such workout found"})
    }

    res.status(200).json(workout)
    
}

module.exports = { 
    getWorkouts, 
    getWorkout, 
    addWorkout, 
    delWorkout, 
    updateWorkout,
    getWorkoutsofanUser };
