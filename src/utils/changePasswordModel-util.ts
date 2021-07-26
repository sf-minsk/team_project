export const changePasswordModel = (email: string) => {
    return {
        email: email,
        from: "Cards project <sf-minsk@outlook.com>",
        message:
            `<div style="background-color: #9bf8d2; padding: 15px">
                    password recovery link:
                        <a href='http://localhost:3000/#/changepassword/newpassword/$token$'>click</a>
                </div>`,
    }
}