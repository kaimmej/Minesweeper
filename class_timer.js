class Timer{

    timerObject


    startTimer(){

        let count = 0



        this.timerObject = setInterval(function() {

            count ++ 


            let minutes = parseInt(count / 60, 10)
            let seconds = parseInt(count % 60, 10)

            // figure out the images for the seconds count up... 
            let firstDigitSeconds = Math.floor(seconds / 10)
            // let secondDigitSeconds = seconds / 10 
            let secondDigitSeconds = seconds < 10 ? seconds  : seconds % 10

            let s10 = seconds < 10 ? '<image src= extra_credit\\d0.png height=25px>' : '<image src= extra_credit\\d' + firstDigitSeconds + '.png height=25px>'
            let s1 = '<image src= extra_credit\\d' + secondDigitSeconds + '.png height=25px>'
            let secondsImageInjector = s10 + s1;

            
            // figure out the images for the seconds count up... 
            let firstDigitMinutes = Math.floor(minutes / 10)
            let secondDigitMinutes = minutes < 10 ? minutes  : minutes % 10

            let m10 = minutes < 10 ? '<image src= extra_credit\\d0.png height=25px>' : '<image src= extra_credit\\d' + firstDigitMinutes + '.png height=25px>'
            let m1 = '<image src= extra_credit\\d' + secondDigitMinutes + '.png height=25px>'
            let minutesImageInjector = m10 + m1;
            
            const display = document.querySelector('[time-count]')

            // display.textContent = minutes + ":" + seconds;
            display.innerHTML = minutesImageInjector + "    " + secondsImageInjector;



        }, 1000)
    }

    stopTimer(){
        clearInterval(this.timerObject)
    }

    resetTimer(){
        this.stopTimer()
        this.startTimer()
    }
}