const tg = window.Telegram.WebApp;

export function useTelegram(){

    const onToggleMainButton = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    return{
        tg,
        onToggleMainButton
    }
}