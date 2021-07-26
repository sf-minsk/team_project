export const changePasswordModel = (email: string) => {
    debugger
    return {
        email: email,
        from: "hujnya-project <sf-minsk@outlook.com>",
        message:
            `<div style="background-color: #9bf8d2; padding: 15px">
                    password recovery link:
                        <a href='http://localhost:3000/#/set-new-password/$token$'>click</a>
                </div>`,
    }
}