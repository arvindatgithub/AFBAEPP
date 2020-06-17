import { TestBed } from '@angular/core/testing';

import { GroupsearchService } from './groupsearch.service';

describe('GroupsearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupsearchService = TestBed.get(GroupsearchService);
    expect(service).toBeTruthy();
  });
});
