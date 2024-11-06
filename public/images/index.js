function reply()
{
event.preventDefault();
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), { keyboard: false })
myModal.show();  
}

function exercise()
{
event.preventDefault();

var frequencyElement = document.getElementById("exercise_frequency");
var exercise_frequency = frequencyElement.options[frequencyElement.selectedIndex].value;

var durationElement = document.getElementById("each_exercise_duration");
var each_exercise_duration = durationElement.options[durationElement.selectedIndex].value;

var exerciseRecommendation = evaluateExercise(exercise_frequency, each_exercise_duration);

var recommendationElement = document.getElementById("recommendation_output");
recommendationElement.innerHTML = exerciseRecommendation;

var exerciseModal = new bootstrap.Modal(document.getElementById('exerciseModal'), { keyboard: false })
exerciseModal.show();  
}

function evaluateExercise(exercise_frequency, each_exercise_duration){
    if(exercise_frequency == "Not at all"){
        if(each_exercise_duration == "Not applicable"){
            return  "Try to exercise 2 times a week, 30 minutes each!";
        }
    }
    if(exercise_frequency == "Less than once a week"){
        if(each_exercise_duration == "Less than 30 minutes each" || "30 minutes to 1 hour each"){
            result = "Try to exercise 2 times a week, 30 minutes each!";
        }
            if(each_exercise_duration == "More than 1 hour each"){
                result = "Try to spread out your exercise more frequently!";
            }
            return result;   
}
    if(exercise_frequency == "Once a week"){
    if(each_exercise_duration == "Less than 30 minutes each" || "30 minutes to 1 hour each"){
        result = "Try to exercise 2 times a week, 30 minutes each!";
    }
        if(each_exercise_duration == "More than 1 hour each"){
            result = "Try to spread out your exercise more frequently!";
        }
        return result;
   
}
    if(exercise_frequency == "2 to 3 times a week"){
    if(each_exercise_duration == "Less than 30 minutes each" || "30 minutes to 1 hour each"){
        result = "Keep it up!";
    }
        if(each_exercise_duration == "More than 1 hour each"){
            result = "You may be overexercising, perhaps reduce the duration to 1 hour.";
        }
        return result;

}
    if(exercise_frequency == "More than 3 times a week"){
        if(each_exercise_duration == "Less than 30 minutes each" || "30 minutes to 1 hour each" ){
            result =  "Keep it up!";
        }
            if(each_exercise_duration == "More than 1 hour each"){
                result =  "You may be overexercising, perhaps reduce the duration to 1 hour.";
            }
            return result;
    }
}

function food()
{
event.preventDefault();

var intakeElement = document.getElementById("food_intake");
var food_intake = intakeElement.options[intakeElement.selectedIndex].value;


var groupElement = document.getElementById("food_group");
var options = groupElement.selectedOptions;
var food_group = Array.from(options).map(({ value }) => value);

var foodRecommendation = evaluateFood(food_intake, food_group);

var recommendationElement = document.getElementById("recommendation_output");
recommendationElement.innerHTML = foodRecommendation;

var foodModal = new bootstrap.Modal(document.getElementById('foodModal'), { keyboard: false })
foodModal.show();  
}

function isSelected(arr,val){
    if(arr.indexOf(val) != -1)
    {  
        return true;
    }
    return false;
}

function buildResult(str, newStr){
    if (str!=""){
        return str + " and " + newStr; 
    }
    return "You need " + newStr
}

function evaluateFood(food_intake, food_group){

    // console.log(food_group, food_intake);

    if(food_intake == "1 meal a day"){
            return "You need to eat at least 2 meals a day.";
        }
    console.log(food_group.length);
    if(food_intake == "2 meals a day" || "3 meals a day" || "More than 3 meals"){

        if (food_group.length == 1 ){
            return "You need more well-balanced meals.";
        }
        
        var result = "";
        var need = "";
      
        if(isSelected(food_group,"0") == false){
            result = buildResult(result, "Carbohydrate");
        }

        if(isSelected(food_group,"1") == false){
            result = buildResult(result, "Protein");
        }

        if(isSelected(food_group,"2") == false){
            result = buildResult(result, "Vegetable");
        }

        if(isSelected(food_group,"3") == false){
            result = buildResult(result, "Fruit");
        }

    return result + " in your meals.";
    }
}
   
  



function sleep()
{
event.preventDefault();

var nameElement = document.getElementById("Name");
var Name = nameElement.options[nameElement.selectedIndex].value;

var ageElement = document.getElementById("Age_range");
var Age_range = ageElement.options[ageElement.selectedIndex].value;

var genderElement = document.getElementById("Gender");
var Gender = genderElement.options[genderElement.selectedIndex].value;

var sleepElement = document.getElementById("Sleep_duration");
var Sleep_duration = sleepElement.options[sleepElement.selectedIndex].value;

var timeElement = document.getElementById("Sleep_time");
var Sleep_time = timeElement.options[timeElement.selectedIndex].value;

var emailElement = document.getElementById("Email_address");
var Email_address = emailElement.options[emailElement.selectedIndex].value;


var sleepRecommendation = evaluateSleep(Age_range, Sleep_duration);

var recommendationElement = document.getElementById("recommendation_output");
recommendationElement.innerHTML = sleepRecommendation;

var sleepModal = new bootstrap.Modal(document.getElementById('sleepModal'), { keyboard: false })
sleepModal.show();

Create an object with the data
const userData = { Name, Age_range, Gender, Sleep_duration, Sleep_time, Email_address };

try {
  // Send POST request to server
  const response = await fetch('/pages/Sleep', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData) // Send the data as JSON
  });

  const result = await response.json(); // Assuming server sends a JSON response
  document.getElementById('responseMessage').innerText = result.message;
} catch (error) {
  console.error('Error:', error);
  document.getElementById('responseMessage').innerText = 'Error submitting data!';
}
}


function evaluateSleep(Age_range, Sleep_duration){
    if(Age_range == "Below 25" || "25 - 35" || "36 - 45" || "Above 45"){
        if(Sleep_duration == "Less than 6 hours"){
            return "You need at least 6 to 7 hours of sleep.";
        }
    }
    if(Age_range == "Below 25"|| "25 - 35" || "36 - 45"){
        if(Sleep_duration == "6 to 7 hours"){
            return "Try to sleep for 7 hours if you can.";
        }
    }
    if(Age_range == "Below 25" || "25 - 35" || "36 - 45"){
        if(Sleep_duration == "7 to 8 hours"){
            return "Great to know you sleep sufficiently.";
        }
    }
    if(Age_range == "Below 25" || "25 - 35" || "36 - 45"){
        if(Sleep_duration == "More than 8 hours"){
            return "You certainly sleep a lot.";
        }
    }
    
    if(Age_range == "Above 45"){
        if(Sleep_duration == "6 to 7 hours"){
            return "Great to know you sleep sufficiently";
        }
    }
    if(Age_range == "Above 45"){
        if(Sleep_duration == "7 to 8 hours"){
            return "You certainly sleep more.";
        }
    }
    if(Age_range == "Above 45"){
        if(Sleep_duration == "More than 8 hours"){
            return "You certainly sleep a lot.";
        }
    }
}
