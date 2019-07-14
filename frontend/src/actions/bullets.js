export const RECEIVE_BULLETS = 'RECEIVE_BULLETS';
export const REMOVE_BULLET = 'REMOVE_BULLET';


export const receiveBullets = bullets => ({
    type: RECEIVE_BULLETS,
    bullets
});

export const destroyBullets = bullet => ({
    type: REMOVE_BULLET,
    bullet
});