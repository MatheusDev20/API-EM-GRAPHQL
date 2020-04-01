const transformUsers = user => {
    return {
        ...user._doc,
        _id: user.id,
        email: user.email,
        name: user.name,
        cpf: user.cpf

    }
}
exports.transformUsers = transformUsers