function isInput(inputs, reqExp = true) {
    let msg = "is required.";
    for (const input of inputs) {
        const currInput = $(input);
        const currInputType = currInput.attr("type");
        const currInputType_Capitalized = currInputType.charAt(0).toUpperCase() + currInputType.slice(1);
        const currInputVal = currInput.val();
        const inputParent = currInput.parent();
        const isPassword = currInputType == 'password';
        const small = inputParent.find("small");

        if (!currInputVal) {
            small.addClass('d-block').text(`${currInputType_Capitalized} ${msg}`)
        } else {
            small.removeClass('d-block');

            if (reqExp)
                isValid(currInputVal)[currInputType]
                    ? small.removeClass('d-block')
                    : small.addClass('d-block').text(`A valid ${currInputType_Capitalized} is ${isPassword ? 'minimum eight characters, at least one letter, one number and one special character' : msg}`)
        }

    }
}

function isValid(input) {
    const testInput = (exp) => new RegExp(exp).test(input);
    return {
        ['full name']: testInput(/^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/),
        password: testInput(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/),
        email: testInput(
            "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"
        )
    }

}