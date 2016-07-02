const NEAR = 0.1;
const FAR = 1000;

export default class App {
    constructor() {
        this._bind('_render', '_handleResize');
        this._setup3D();
        this._createScene();

        window.addEventListener('resize', '_handleResize');
    }

    start() {
        requestAnimationFrame(this._render);
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    _setup3D() {
        const renderer = this._renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderer.domElement);

        this._scene = new THREE.Scene();
        const camera = this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, NEAR, FAR);
        camera.position.setY(1.6);
    }

    _createScene() {
        const scene = this._scene;

        var grid = new THREE.GridHelper(1000, 5, 0x333333, 0x333333);
        scene.add(grid);
    }
    
    _render(timestamp) {
        const scene = this._scene;
        const camera = this._camera;
        const renderer = this._renderer;

        renderer.render(scene, camera);

        requestAnimationFrame(this._render);
    }

    _handleResize(event) {
        const renderer = this._renderer;
        const camera = this._camera;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
