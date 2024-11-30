import { MotionSensor, SurveillanceController, VideoRecorder } from '../core/surveillanceController';

describe('The Surveillance Controller', () => {
	it('should ask the recorder to stop recording when the sensor detects no motion', () => {
		//Using monkey patching we created a spy of stop recording method by replacing it
		let called = false;
		const saveCall = () => {
			called = true;
		};

		const sensor = new FakeSensor();
		const recorder = new FakeRecorder();
		recorder.stopRecording = saveCall;
		const controller = new SurveillanceController(sensor, recorder);

		controller.recordMotion();

		expect(called).toBeTruthy();
	});

	it('should ask the recorder to start recording when the sensor detects motion', () => {
		//Using monkey patching we created a spy of start recording method by replacing it
		let called = false;
		const saveCall = () => {
			called = true;
		};

		//need to create a sensor stub to simulate motion detected
		const sensor = new FakeSensor();
		sensor.isDetectingMotion = () => true;

		const recorder = new FakeRecorder();
		recorder.startRecording = saveCall;
		const controller = new SurveillanceController(sensor, recorder);

		controller.recordMotion();

		expect(called).toBeTruthy();
	});
});

class FakeSensor implements MotionSensor {
	isDetectingMotion(): boolean {
		return false;
	}
}

class FakeRecorder implements VideoRecorder {
	startRecording(): void {
		// eslint-disable-next-line no-console
		console.log('start recording ...');
	}

	stopRecording(): void {
		// eslint-disable-next-line no-console
		console.log('stop recording ...');
	}
}
