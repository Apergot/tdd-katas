import { MotionSensor, SurveillanceController, VideoRecorder } from '../core/surveillanceController';

describe('The Surveillance Controller', () => {
	it('should ask the recorder to stop recording when the sensor detects no motion', () => {
		const sensor = new StubSensorDetectingNoMotion();
		const recorder = new FakeRecorder();
		const controller = new SurveillanceController(sensor, recorder);
		const spyRecorder = jest.spyOn(recorder, 'stopRecording');

		controller.recordMotion();

		expect(spyRecorder).toHaveBeenCalled();
	});

	it('should ask the recorder to start recording when the sensor detects motion', () => {
		const sensor = new StubSensorDetectingMotion();
		const recorder = new FakeRecorder();
		const controller = new SurveillanceController(sensor, recorder);
		const spyRecorder = jest.spyOn(recorder, 'startRecording');

		controller.recordMotion();

		expect(spyRecorder).toHaveBeenCalled();
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
		console.log('start recording');
	}

	stopRecording(): void {
		// eslint-disable-next-line no-console
		console.log('stop recording');
	}
}
