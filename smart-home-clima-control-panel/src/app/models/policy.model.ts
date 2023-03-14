import { PolicyGroup } from 'src/app/models/policy-group.model';

export class Policy {
    id!: number;
	reactiveMargin?: number;
	dangerMargin?: number;
	optimalTemperature?: number;
	startHour!: any;
	endHour!: any;
	active!: boolean;
	policyGroup?: PolicyGroup;
}

export class PolicyRequest {
	policies!: Policy[];
	policyGroupId!: number;
}