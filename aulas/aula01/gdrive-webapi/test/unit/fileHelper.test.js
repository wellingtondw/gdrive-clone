import { describe, test, expect, jest } from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'
import Routes from '../../src/routes.js'

describe('#FileHelper', () => {

  describe('#getFileStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 2065,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 13896522,
        size: 67298,
        blocks: 136,
        atimeMs: 1631022140255.3872,
        mtimeMs: 1631022136043.4065,
        ctimeMs: 1631022136043.4065,
        birthtimeMs: 1631022136043.4065,
        atime: '2021-09-07T13:42:20.255Z',
        mtime: '2021-09-07T13:42:16.043Z',
        ctime: '2021-09-07T13:42:16.043Z',
        birthtime: '2021-09-07T13:42:16.043Z'
      }

      const mockUser = 'wellingtonlima'
      process.env.USER = mockUser
      const filename = 'file.png'

      jest.spyOn(fs.promises, fs.promises.stat.name)
          .mockResolvedValue(statMock)

      jest.spyOn(fs.promises, fs.promises.readdir.name)
      .mockResolvedValue([filename])

      const result = await FileHelper.getFileStatus('/tmp')


      const expectedResult = [
        {
          size: '67.3 kB',
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename
        }
      ]

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
      expect(result).toMatchObject(expectedResult)
    })
  })
})