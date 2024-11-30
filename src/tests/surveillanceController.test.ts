import { MotionSensor, SurveillanceController, VideoRecorder } from '../core/surveillanceController';

describe('The Surveillance Controller', () => {
	it('should ask the recorder to stop recording when the sensor detects no motion', () => {
		let called = false;
		const saveCall = () => {
			called = true;
		};

		const sensor = new StubSensorDetectingNoMotion();
		const recorder = new FakeRecorder();
		recorder.stopRecording = saveCall;
		const controller = new SurveillanceController(sensor, recorder);

		controller.recordMotion();

		expect(called).toBeTruthy();
	});

	it('should ask the recorder to start recording when the sensor detects motion', () => {
		let called = false;
		const saveCall = () => {
			called = true;
		};

		const sensor = new StubSensorDetectingMotion();
		const recorder = new FakeRecorder();
		recorder.startRecording = saveCall;
		const controller = new SurveillanceController(sensor, recorder);

		controller.recordMotion();

		expect(called).toBeTruthy();
	});
});

class StubSensorDetectingNoMotion implements MotionSensor {
	isDetectingMotion(): boolean {
		return false;
	}
}

class StubSensorDetectingMotion implements MotionSensor {
	isDetectingMotion(): boolean {
		return true;
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
